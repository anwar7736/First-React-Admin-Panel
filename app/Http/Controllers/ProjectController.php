<?php

namespace App\Http\Controllers;

use App\Models\ClientReviewModel;
use App\Models\ContactTableModel;
use App\Models\ProjectModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
      
  function GetProjectById(Request $req)
  {
      $ProjectId = $req->id;
      $result  = ProjectModel::where('id', $ProjectId)->get();
      return $result;
  }

  function onEditProject(Request $req)
   {
       $ProjectId = $req->input('id');
       $img_one = $req->file('img_one');
       $img_two = $req->file('img_two');
       $project_name = $req->input('project_name');
       $short_description = $req->input('short_description');
       $project_features = $req->input('project_features');
       $live_preview = $req->input('live_preview');
       
       $getProject = ProjectModel::where(['id'=>$ProjectId, 'project_name'=>$project_name])->count();
       $isExist   = ProjectModel::where('project_name', $project_name)->count();
       if($getProject===1 || $isExist===0)
       {
        if($img_one=='' && $img_two=='')
        {
            $result = ProjectModel::where('id', $ProjectId)->update([
                'project_name'=>$project_name,
                'short_description'=>$short_description,
                'project_features'=>$project_features,
                'live_preview'=>$live_preview
            ]);

            return $result;
        }

        else if($img_two=='')
        {
          $getData = ProjectModel::where('id', $ProjectId)->get();
          $getImageOneName = explode('/', $getData[0]['img_one'])[6];
          Storage::delete('public/'.$getImageOneName);
          
          $imagePath = $img_one->store('public');
          $imageName = explode('/', $imagePath)[1];
          $imageURL  = 'https://'.$_SERVER['HTTP_HOST'].'/storage/app/public/'.$imageName;

          $result = ProjectModel::where('id', $ProjectId)->update([
            'img_one'=>$imageURL,
            'project_name'=>$project_name,
            'short_description'=>$short_description,
            'project_features'=>$project_features,
            'live_preview'=>$live_preview
        ]);

        return $result;
        }

        else if($img_one=='')
        {
          $getData = ProjectModel::where('id', $ProjectId)->get();
          $getImageTwoName = explode('/', $getData[0]['img_two'])[6];
          Storage::delete('public/'.$getImageTwoName);
          
          $imagePath = $img_two->store('public');
          $imageName = explode('/', $imagePath)[1];
          $imageURL  = 'https://'.$_SERVER['HTTP_HOST'].'/storage/app/public/'.$imageName;

          $result = ProjectModel::where('id', $ProjectId)->update([
            'img_two'=>$imageURL,
            'project_name'=>$project_name,
            'short_description'=>$short_description,
            'project_features'=>$project_features,
            'live_preview'=>$live_preview
        ]);

        return $result;
        } 
        
       }

       else
       {
           return "Project name already exists";
       }
   }

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
