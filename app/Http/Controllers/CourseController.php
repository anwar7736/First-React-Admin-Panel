<?php

namespace App\Http\Controllers;
use App\Models\ContactTableModel;
use Illuminate\Http\Request;
use App\Models\CourseTableModel;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{

    
   function GetCourseById(Request $req)
   {
       $CourseId = $req->id;
       $result  = CourseTableModel::where('id', $CourseId)->get();
       return $result;
   }

   function onEditCourse(Request $req)
   {
       $CourseId = $req->input('id');
       $short_title = $req->input('short_title');
       $short_des = $req->input('short_des');
       $small_img = $req->file('small_img');
       $long_title = $req->input('long_title');
       $long_des = $req->input('long_des');
       $total_lecture = $req->input('total_lecture');
       $total_student = $req->input('total_student');
       $skill_all = $req->input('skill_all');
       $video_url = $req->input('video_url');
       $courses_link = $req->input('courses_link');
       
       $getCourse = CourseTableModel::where(['id'=>$CourseId, 'short_title'=>$short_title])->count();
       $isExist   = CourseTableModel::where('short_title', $short_title)->count();
       if($getCourse===1 || $isExist===0)
       {
        if(empty($small_img))
        {
            $result = CourseTableModel::where('id', $CourseId)->update([
                'short_title'=>$short_title,
                'short_des'=>$short_des,
                'long_title'=>$long_title,
                'long_des'=>$long_des,
                'total_lecture'=>$total_lecture,
                'total_student'=>$total_student,
                'skill_all'=>$skill_all,
                'video_url'=>$video_url,
                'courses_link'=>$courses_link
            ]);

            return $result;
        }
        else
        {
            $getData = CourseTableModel::where('id', $CourseId)->get();
            $getImageName = explode('/', $getData[0]['small_img'])[6];
            Storage::delete('public/'.$getImageName);
            
            $imagePath = $small_img->store('public');
            $imageName = explode('/', $imagePath)[1];
            $imageURL  = 'https://'.$_SERVER['HTTP_HOST'].'/storage/app/public/'.$imageName;
            $result = CourseTableModel::where('id', $CourseId)->update([
                'short_title'=>$short_title,
                'short_des'=>$short_des,
                'small_img'=>$imageURL,
                'long_title'=>$long_title,
                'long_des'=>$long_des,
                'total_lecture'=>$total_lecture,
                'total_student'=>$total_student,
                'skill_all'=>$skill_all,
                'video_url'=>$video_url,
                'courses_link'=>$courses_link
            ]);

            return $result;


        }
       }
       else
       {
           return "Short title already exists";
       }
   }

   function onSelectFour(){
        $result=CourseTableModel::limit(4)->get();
        return $result;
    }

    function onSelectAll(){
        $result=CourseTableModel::all();
        return $result;
    }

    function onSelectDetails($CourseID){
        $id=$CourseID;
        $result=CourseTableModel::where(['id'=>$id])->get();
        return $result;
    }

    function CourseList(){
        $result=CourseTableModel::all();
        return $result;
    }

    function CourseDelete(Request $request){
        $id=$request->input('id');
        $db_image = CourseTableModel::where('id',$id)->get(['small_img']);
        $img_name = explode('/', $db_image[0]['small_img'])[6];
        $path_name = 'public/'.$img_name;
        Storage::delete($path_name);
        $result=CourseTableModel::where('id','=',$id)->delete();
        return $result;
    }
    function AddCourse(Request $request)
    {
    	$short_title = $request->input('short_title');
    	$short_des = $request->input('short_des');
    	$long_title = $request->input('long_title');
    	$long_des = $request->input('long_des');
    	$skill_all = $request->input('skill_all');
    	$courses_link = $request->input('courses_link');
    	$video_url = $request->input('video_url');
    	$photoPath = $request->file('small_img')->store('public');
    	$photoName = explode("/", $photoPath)[1];
    	$photoURL = "https://".$_SERVER['HTTP_HOST']."/storage/app/public/".$photoName;

    	 $result= CourseTableModel::insert(['short_title'=>$short_title, 'short_des'=>$short_des, 'long_title'=>$long_title, 'long_des'=>$long_des, 'small_img'=>$photoURL, 'courses_link'=>$courses_link, 'video_url'=> $video_url, 'skill_all'=> $skill_all, 'total_student'=>50, 'total_lecture'=>30]);
        return $result;

    }
}
