<?php

namespace App\Http\Controllers;

use App\Models\AdminLoginModel;
use Illuminate\Http\Request;
use Hash;
class AdminLoginController extends Controller
{

    function LoginPage(){
        return view('login');
    }


    function onLogin(Request $request){
        $UserName =$request->UserName;
        $Password =$request->Password;
        $user=AdminLoginModel::where('user_name', $UserName)->get();
        if(count($user) > 0 && Hash::check($Password, $user[0]['password'])==true) {
            $request->session()->put(['user_name'=>$UserName, 'user_pass'=>$Password]);
            return "1";
            
        }else{
            return 0;
        }
    }

    function onLogout(Request $request){
        $request->session()->flush();
        return redirect('/login');
    }

}
