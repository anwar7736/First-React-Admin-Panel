<?php

namespace App\Http\Controllers;

use App\Models\ContactTableModel;
use Illuminate\Http\Request;

class ContactController extends Controller
{
	function onContactSend(Request $req){
    
     $ContactArray=  json_decode($req->getContent(),true);
     $name = $ContactArray['name'];
     $email=$ContactArray['email'];
    $msg=$ContactArray['msg'];
     $result=ContactTableModel::insert(['name'=>$name,'email'=>$email,'message'=>$msg]);
    if($result==true){
     return 1;
    }
    else{
     return 0;
    }
}

    function ContactList(){
        $result=ContactTableModel::all();
        return $result;
    }

    function ContactDelete(Request $request){
        $id=$request->input('id');
        $result=ContactTableModel::where('id',$id)->delete();
        return $result;
    }
}
