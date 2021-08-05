<?php

namespace App\Http\Controllers;

use App\Models\ClientReviewModel;
use App\Models\ContactTableModel;
use App\Models\ProjectModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    function onSelect3(){
      $result= ProjectModel::limit(3)->get();
      return $result;
    }

    function onSelectAll(){
        $result= ProjectModel::all();
        return $result;
      }

    function onSelectDetail($projectID){
        $id= $projectID;
        $result= ProjectModel::where(['id'=>$id])->get();
        return $result;
      }


    function ProjectList(){
        $result=ProjectModel::all();
        return $result;
    }
    function ProjectDelete(Request $request){
        $id=$request->input('id');


        $img_one= ProjectModel::where('id',$id)->get(['img_one','img_two']);

        $img_one_name=explode('/',$img_one[0]['img_one'])[6];
        $img_two_name=explode('/',$img_one[0]['img_two'])[6];

        Storage::delete(['public/'.$img_one_name, 'public/'.$img_two_name]);


        $result=ProjectModel::where('id','=',$id)->delete();
        return $result;
    }

    function AddProject(Request $request){
        $projectName=  $request->input('projectName');
        $projectDes=  $request->input('projectDes');
        $projectFeatures=  $request->input('projectFeatures');
        $projectLink=  $request->input('projectLink');

        $photoOnePath=$request->file('photoOne')->store('public');
        $photoOneName=explode("/", $photoOnePath)[1];
        $photoOneURL="https://".$_SERVER['HTTP_HOST']."/storage/app/public/".$photoOneName;

        $photoTwoPath=$request->file('photoTwo')->store('public');
        $photoTwoName=explode("/", $photoTwoPath)[1];
        $photoTwoURL="https://".$_SERVER['HTTP_HOST']."/storage/app/public/".$photoTwoName;

        $result= ProjectModel::insert(['img_one'=>$photoOneURL, 'img_two'=>$photoTwoURL, 'project_name'=>$projectName, 'short_description'=>$projectDes, 'project_features'=>$projectFeatures, 'live_preview'=>$projectLink]);
        return $result;
    }
}
