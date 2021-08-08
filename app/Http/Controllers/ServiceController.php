<?php
namespace App\Http\Controllers;
use App\Models\ClientReviewModel;
use App\Models\ServiceModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    function GetServiceById(Request $req)
    {
        $ServiceId = $req->id;
        $result  = ServiceModel::where('id', $ServiceId)->get();
        return $result;
    }

    function onEditService(Request $req)
    {
        $ServiceId = $req->input('id');
        $service_name = $req->input('service_name');
        $service_description = $req->input('service_description');
        $service_logo = $req->file('service_logo');
    
        $getService = ServiceModel::where(['id'=>$ServiceId, 'service_name'=>$service_name])->count();
        $isExist   = ServiceModel::where('service_name', $service_name)->count();
        if($getService===1 || $isExist===0)
        {
         if(empty($service_logo))
         {
             $result = ServiceModel::where('id', $ServiceId)->update([
                'service_name'=>$service_name,
                'service_description'=>$service_description
             ]);
 
             return $result;
         }

         else
         {
             $getData = ServiceModel::where('id', $ServiceId)->get();
             $getImageName = explode('/', $getData[0]['service_logo'])[6];
             Storage::delete('public/'.$getImageName);
             
             $imagePath = $service_logo->store('public');
             $imageName = explode('/', $imagePath)[1];
             $imageURL  = 'https://'.$_SERVER['HTTP_HOST'].'/storage/app/public/'.$imageName;
             $result = ServiceModel::where('id', $ServiceId)->update([
                'service_name'=>$service_name,
                'service_description'=>$service_description,
                'service_logo' => $imageURL
             ]);

             return $result;
 
 
         }
        }
        else
        {
            return "Service name already exists";
        }
    }


    function onSelect(){
        $result= ServiceModel::all();
        return  $result;  
    }

    function ServiceList(){
        $result=ServiceModel::all();
        return $result;
    }

    function ServiceDelete(Request $request){
        $id=$request->input('id');

        $service_logo=ServiceModel::where('id','=',$id)->get(['service_logo']);
        $service_logo_name=explode('/',$service_logo[0]['service_logo'])[6];
        Storage::delete('public/'. $service_logo_name);
        $result=ServiceModel::where('id','=',$id)->delete();
        return $result;
    }
    function AddService(Request $request){
        $title=  $request->input('name');
        $des=  $request->input('desc');
        $PhotoPath=$request->file('photo')->store('public');
        $PhotoName=explode("/", $PhotoPath)[1];
        $PhotoURL="https://".$_SERVER['HTTP_HOST']."/storage/app/public/".$PhotoName;
        $result= ServiceModel::insert(['service_name'=>$title,'service_description'=>$des,'service_logo'=> $PhotoURL]);
        return $result;
    }
}
