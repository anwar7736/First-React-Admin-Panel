<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AdminLoginController;

Route::view('/toastr', 'toastr');

Route::group(['middleware'=>'CheckLogin'], function(){

// Home Data Manage....
Route::get('/CountSummary',[HomeController::class, 'CountSummary']);


//Contact Data Manage....
Route::get('/ContactList', [ContactController::class, 'ContactList']);
Route::post('/ContactDelete', [ContactController::class, 'ContactDelete']);


//Courses Data Manage....
Route::get('/CourseList', [CourseController::class, 'CourseList']);
Route::post('/CourseDelete',[CourseController::class, 'CourseDelete']);


//Project Data Manage....
Route::get('/ProjectList', [ProjectController::class, 'ProjectList']);
Route::post('/ProjectDelete', [ProjectController::class, 'ProjectDelete']);
Route::post('/AddProject', [ProjectController::class, 'AddProject']);

//Service Data Manage....
Route::get('/ServiceList', [ServiceController::class, 'ServiceList']);
Route::post('/ServiceDelete', [ServiceController::class, 'ServiceDelete']);
Route::post('/AddService', [ServiceController::class, 'AddService']);


//Review Data Manage....
Route::get('/ReviewList', [ReviewController::class, 'ReviewList']);
Route::post('/ReviewDelete', [ReviewController::class, 'ReviewDelete']);
Route::post('/AddReview', [ReviewController::class, 'AddReview']);


});



//Admin Login Manage....
Route::get('/login',[AdminLoginController::class, 'LoginPage'])->middleware('CheckSession');
Route::get('/onLogin/{UserName}/{Password}',[AdminLoginController::class, 'onLogin']);
Route::get('/logout',[AdminLoginController::class, 'onLogout']);

Route::group(['middleware'=> 'CheckLogin'], function(){
Route::get('/', function () {
    return view('index');
});

Route::get('{any}', function () {
    return view('index');
})->where('any', '.*');

});






