<?php

namespace App\Http\Controllers;

use App\Models\ClientReviewModel;
use App\Models\ContactTableModel;
use Illuminate\Http\Request;
use Storage, DB;


class ReviewController extends Controller
{
    function GetReviewById(Request $req)
    {
        $ReviewId = $req->id;
        $result  = ClientReviewModel::where('id', $ReviewId)->get();
        return $result;
    }

    function onEditReview(Request $req)
    {
        $ReviewId = $req->input('id');
        $client_title = $req->input('client_title');
        $client_description = $req->input('client_description');
        $client_img = $req->file('client_img');
    
        $getReview = ClientReviewModel::where(['id'=>$ReviewId, 'client_title'=>$client_title])->count();
        $isExist   = ClientReviewModel::where('client_title', $client_title)->count();
        if($getReview===1 || $isExist===0)
        {
         if(empty($client_img))
         {
             $result = ClientReviewModel::where('id', $ReviewId)->update([
                'client_title'=>$client_title,
                'client_description'=>$client_description
             ]);
 
             return $result;
         }

         else
         {
             $getData = ClientReviewModel::where('id', $ReviewId)->get();
             $getImageName = explode('/', $getData[0]['client_img'])[6];
             Storage::delete('public/'.$getImageName);
             
             $imagePath = $client_img->store('public');
             $imageName = explode('/', $imagePath)[1];
             $imageURL  = 'https://'.$_SERVER['HTTP_HOST'].'/storage/app/public/'.$imageName;
             $result = ClientReviewModel::where('id', $ReviewId)->update([
                'client_title'=>$client_title,
                'client_description'=>$client_description,
                'client_img'=>$imageURL,
                
             ]);

             return $result;
 
 
         }
        }
        else
        {
            return "Review title already exists";
        }
    }

    function ReviewList(){
        $result=ClientReviewModel::all();
        return $result;
    }
    function ReviewDelete(Request $request){
        $id=$request->input('id');

        $client_img=ClientReviewModel::where('id',$id)->get();
        $client_img_name=explode('/',$client_img[0]['client_img'])[6];
        Storage::delete('public/'.$client_img_name);
        $result=ClientReviewModel::where('id',$id)->delete();
        return $result;
    }

    function AddReview(Request $request){
        $title=  $request->input('title');
        $des=  $request->input('desc');
        $PhotoPath=$request->file('photo')->store('public');
        $PhotoName=explode("/", $PhotoPath)[1];

        $PhotoURL="https://".$_SERVER['HTTP_HOST']."/storage/app/public/".$PhotoName;
        $result= ClientReviewModel::insert(['client_img'=> $PhotoURL,'client_title'=>$title,'client_description'=>$des]);
        return $result;
    }


}
