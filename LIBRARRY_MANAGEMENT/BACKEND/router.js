const express = require('express')
const router = express.Router()
const userCol = require("./schema/schema")
const bookCol = require("./schema/bookSchema")

router.post('/Add-user', async (req, res) => {
  const { id, name, phone } = req.body;

  // Check if the user with the given ID already exists
  const existingUser = await userCol.findOne({ id });

  if (existingUser) {
    return res.status(400).json({
      status: 'failed',
      message: 'The user already exists. Please re-enter the details using another ID.',
    });
  }

  const Addinguser = new userCol({ id, name, phone });

  try {
    await Addinguser.save();
    res.status(201).json({
      status: 'success',
      data: {
        message: 'User added successfully',
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err,
    });
  }
});

router.delete('/del-user', async(req,res) => {
  const id=req.body.id
  const existingUser = await userCol.findOne({ id });
  if(!existingUser){
    return res.status(400).json({
      status: 'failed',
      message: 'The user is not there,please recheck your id',
    });
  }

  await userCol.deleteOne({id:id})
  
  try{
  
    res.status(204).json({
        status : 'Success',
        data : {
          message:"deleted success"
        }
    })
  }catch(err){
      res.status(500).json({
          status: 'Failed',
          message : err
      })
  }
})

router.get('/viu-user', async (req, res) => {
    const id = req.query.id;
    const result = await userCol.find({ id:id });
    console.log(id)
    try {
     
     
      res.status(200).json({
        status: 'Success',
        data: {
          result
        },
      });
    } catch (err) {
      res.status(500).json({
        status: 'Failed',
        message: err.message
      });
    }
  });
  
  router.patch('/updt-user', async (req, res) => {
    const { name, phone } = req.body;
  
    try {
      const existingUser = await userCol.findOne({ name });
  
      if (!existingUser) {
        return res.status(400).json({
          status: 'failed',
          message: 'The user is not there, please recheck your name',
        });
      }
  
      await userCol.updateOne({ name: name }, { $set: { phone: phone } });
  
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Updated successfully',
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong. Please try again.',
      });
    }
  });
        
router.post('/Add-book', async (req, res) => {
  const { book, bookcount, author } = req.body;

  try {
    const existingBook = await bookCol.findOne({ book });

    if (existingBook) {
      return res.status(400).json({
        status: 'failed',
        message: 'The book already exists. Please go to the update page to manage the book count.',
      });
    } else {
      const Addingbook = new bookCol({ book, bookcount, author });
      await Addingbook.save();

      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Book added successfully',
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

router.patch('/updt-book', async (req, res) => {
  const { book, bookcount } = req.body;

  try {
    const existingBook = await bookCol.findOne({ book });

    if (!existingBook) {
      return res.status(404).json({
        status: 'failed',
        message: 'Book not found. Please recheck the book name.',
      });
    }

    await bookCol.updateOne({ book }, { $inc: { bookcount: parseInt(bookcount) } });

    return res.status(200).json({
      status: 'Success',
      data: {
        message: `Updated book count for ${book} successfully`,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

router.get('/check-user', async (req, res) => {
  const { name, id } = req.query;

  try {
    if (!name || !id) {
      return res.status(400).json({
        status: 'failed',
        message: 'Name and ID are required fields.',
      });
    }

    // Check if the user is admin
    if (name === "admin" && id === "007") {
      return res.status(200).json({
        status: 'success',
        message: 'admin',
      });
    }

    const user = await userCol.findOne({ name, id });

    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found. Please check credentials.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });

  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
});


//To get all books and display it to the user
router.get('/get-books', async (req, res) => {
  try 
  {
    const books = await bookCol.find({});
    return res.status(200).json(books);
  } 
  catch (err) 
  {
    return res.status(500).json
    ({
      status: 'failed',
      message: err.message,
    });
  }
});

router.patch('/Lend-books',async(req,res) => {
    const { bookid,numberOfBooksToLend } = req.body;
    const existingbook = await bookCol.findOne({_id:bookid});

    if(!existingbook)
    {
      return res.status(404).json({
        status:'failed',
        message:'Book is not there'
      })
    }
    if(existingbook.bookcount < numberOfBooksToLend)
    {
      return res.status(400).json({
        status:'failed',
        message:'insufficient book available'
      })
    }
    const updated_count = existingbook.bookcount - numberOfBooksToLend
    await bookCol.findOne({_id:bookid},{$set:{bookcount:updated_count}}) 

    return res.status(200).json({
      status:'success',
      message:'books lent successfully'
    })
  
});





module.exports = router