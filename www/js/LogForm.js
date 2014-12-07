function LogForm(){
      sessionStorage['email']=document.getElementsByName("email")[0].value;
      sessionStorage['password']=document.getElementsByName("password")[0].value;
      window.location="#logged";
  }

