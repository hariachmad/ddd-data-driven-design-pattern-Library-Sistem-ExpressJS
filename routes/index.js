var express = require('express');
var router = express.Router();
var loanService = require('../application/service/loanService');
var useCaseLoanBook = require('../application/usecase/useCaseLoanBook');
var useCaseReturnBook = require('../application/usecase/useCaseReturnBook');
var useCaseMemberCheck = require('../application/usecase/useCaseMemberCheck');
var useCaseBookCheck = require ('../application/usecase/useCaseBookCheck');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/loanBook',async function(req,res,next){
  try{
    const response = await useCaseLoanBook.loanBook(req.body.codeMember,req.body.codeBook,req.body.loanDate);
    console.log(response);
    res.json({
      "messages" : "success",
      "res" : response
    })
  }catch(err){
    console.error("error saat proses post loanBook : "+err);
  }
})

router.post('/returnBook',async function(req,res,next){
  try{
  const response = await useCaseReturnBook.returnBook(req.body.codeBook,req.body.codeMember,req.body.returnDate)
  res.json({
    "messages" :"success",
    "response" :  response.messages
  });
}catch(err){
  console.error("Gagal melakukan Checkout :",err);
}
})

router.get('/getAvailableBooks',async function(req,res,next){
  try{
    const response= await useCaseBookCheck.getAvailableBooks();
    res.json({
      "response" : response
    });
  }catch(err){
    console.error("Tidak bisa routes ke getAvailableBooks: "+err);
  }
})

router.get('/memberCheck',async function(req,res,next){
  try{
    const response= await useCaseMemberCheck.getDataMembers();
    res.json({
      "messages" : "success",
      "res" : response
    });
  }catch(err){
    console.error("Tidak bisa melalkukan /membercheck : "+err);
  }
})

module.exports = router;
