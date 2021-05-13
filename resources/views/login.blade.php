<html>
<head>
    <title>Admin Login</title>
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    <link rel="stylesheet" href="{{asset('css/responsive.css')}}">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw==" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" integrity="sha512-vKMx8UnXk60zUwyUnUPM3HbQo8QfmNx7+ltw8Pm5zLusl1XIfwcxo8DbWCqMGKaWeNxWA8yrx5v3SaVpMvR3CA==" crossorigin="anonymous" />
</head>
<body>
<div class="container">
    <div class="row d-flex justify-content-center">
        <div class="col-md-6 text-center mt-5">
                <div class="card">
                    <div class="card-body">
                        <h3>Admin Login</h3><hr>
                        <input id="userName" class="form-control" type="text" placeholder="User Name"><br>
                        <input id="password" class="form-control" type="password" placeholder="Password"><br>
                        <button id="loginBtn" onclick="AdminLogin()" class="btn normal-btn btn-block">Login</button>
                    </div>
                </div>
        </div>
    </div>

</div>


<script type="text/javascript">
       $('#loginBtn').click(function(){
        var UserName=$('#userName').val();
        var Password=$('#password').val();
        if(UserName==''){
           toastr.warning('Username field is required!');
        }
        else if(Password==''){
           toastr.warning('Password field is required!');
        }
        else{
       $('#loginBtn').html("<div><span class='spinner spinner-grow spinner-grow-sm'></span> Authenticating...</div>");
        setTimeout(()=>{
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function () {
                if(this.readyState==4 && this.status==200){
                      $('#loginBtn').html('Login Failed');  
                      setTimeout(()=>{
                          $('#loginBtn').html('Login');  
                     },2000)
                    if(this.responseText=="1"){
                        $('#loginBtn').html('Login Success'); 
                         toastr.success('Login Success'); 
                        setTimeout(()=>{
                             $('#loginBtn').html('Login');  
                             window.location.href="/";
                        },2000);  
                       
                    }
                    else{
                        toastr.warning('Username or Password Wrong!');
                    }
                }

        }
        xhttp.open("GET","/onLogin/"+UserName+"/"+Password,true);
        xhttp.send();
        },3000)     
        
    }
    });
</script>



</body>
</html>
