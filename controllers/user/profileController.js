const User = require('../../models/userSchema');
const Address = require('../../models/addressSchema')

const profilePage = async (req, res) => {
    try {
        const _id = req.session?._id ?? req.session.passport?.user;

        const userData = await User.findOne({ _id });

        return res.render('user/profileSection/myprofile', { userData });
    } catch (error) {
        console.log(error);
        res.render('user/pagenotFound');
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, dateOfBirth, gender, phone, _id } = req.body;

        const response = await User.updateOne(
            { _id },
            { $set: { name, dateOfBirth, gender, phone } }
        );

        res.status(200).json({ message: 'sucess' });

    } catch (error) {
        console.log(error);
        res.render('user/pagenotFound');
    }
};

const addressPage = async (req, res) => {
    try {

        const _id = req.session?._id ?? req.session.passport?.user;

        //checking is any address exist
        let addressDetails = await Address.findOne({userId:_id});

        if(addressDetails){
            addressDetails = addressDetails.address.filter((ele)=>ele.isBlocked===false);
        }else{
            addressDetails=[]
        }

        const userData = await User.findOne({_id})

        res.render('user/profileSection/addressManagement',{addressDetails,userData});

        
    } catch (error) {
        console.log(error);
        res.render('user/pagenotFound');

    }
}


const addNewAddress = async (req, res) => {
    try {
        const { fullName, houseName, area, street, city, state, pincode, phone } = req.body;
        const _id = req.session?._id ?? req.session.passport?.user;

        //checking is any user address exixt in this particular id
        const result = await Address.findOne({ userId: _id })


        if (result) {

            await Address.updateOne({ userId: _id }, { $push: { address: { fullName, houseName, area, street, city, state, pincode, phone } } });
            res.status(200).redirect('/address')

        } else {

            const address = new Address({ userId: _id, address: [{ fullName, houseName, area, street, city, state, pincode, phone }] });
            await address.save()
            res.status(201).redirect('/address')

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ mesage: 'Something went wrong' })
    }
}



const removeAddress =async (req,res)=>{

    try {
        const addressId = req.query._id;
        const {_id} = req.session;

        const result = await Address.updateOne(
            { 'address._id': addressId }, // Target the specific address by its _id
            { $set: { 'address.$.isBlocked': true } } // Use $ positional operator to update isBlocked
          );

       res.status(200).json({message:'Address sucessfully removed'})
          
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error'})
        
    }
}




module.exports = {
    profilePage,
    updateUser,
    addressPage,
    addNewAddress,
    removeAddress
};
