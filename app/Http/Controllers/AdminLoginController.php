<?php

namespace App\Http\Controllers;

use App\Models\AdminLoginModel;
use Illuminate\Http\Request;

class AdminLoginController extends Controller
{

    function LoginPage(){
        return view('login');
    }


    function onLogin(Request $request){
        $UserName =$request->UserName;
        $Password =$request->Password;
        $count=AdminLoginModel::where(['user_name'=>$UserName, 'password'=>$Password])->count();
        if($count==1){
            $request->session()->put(['user_name'=>$UserName, 'user_pass'=>$Password]);
            return "1";
        }else{
            return "0";
        }
    }

    function onLogout(Request $request){
        $request->session()->flush();
        return redirect('/login');
    }

}
