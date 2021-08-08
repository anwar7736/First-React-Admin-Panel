<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\AdminLoginModel;
use Hash;

class PasswordController extends Controller
{
    function ChangePassword (Request $req)
    {
        $user = $req->input('user');
        $new_pass = Hash::make($req->input('new_pass'));
        $result = AdminLoginModel::where('user_name', $user)->update(['password'=> $new_pass]);
        return $result;
    }
}
