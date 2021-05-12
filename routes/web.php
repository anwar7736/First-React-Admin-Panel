<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AdminLoginController;


// Home Data Manage....
Route::get('/CountSummary',[HomeController::class, 'CountSummary']);


//Contact Data Manage....
Route::get('/ContactList', [ContactController::class, 'ContactList']);
Route::post('/ContactDelete', [ContactController::class, 'ContactDelete']);


//Courses Data Manage....
Route::get('/CourseList','CourseController@CourseList')->middleware('loginCheck');
Route::post('/CourseDelete','CourseController@CourseDelete')->middleware('loginCheck');


//Project Data Manage....
Route::get('/ProjectList','ProjectController@ProjectList')->middleware('loginCheck');
Route::post('/ProjectDelete','ProjectController@ProjectDelete')->middleware('loginCheck');
Route::post('/AddProject','ProjectController@AddProject')->middleware('loginCheck');

//Service Data Manage....
Route::get('/ServiceList','ServiceController@ServiceList')->middleware('loginCheck');
Route::post('/ServiceDelete','ServiceController@ServiceDelete')->middleware('loginCheck');
Route::post('/AddService','ServiceController@AddService')->middleware('loginCheck');


//Review Data Manage....
Route::get('/ReviewList','ReviewController@ReviewList')->middleware('loginCheck');
Route::post('/ReviewDelete','ReviewController@ReviewDelete')->middleware('loginCheck');
Route::post('/AddReview','ReviewController@AddReview')->middleware('loginCheck');


//Admin Login Manage....
Route::get('/Login','AdminLoginController@LoginPage');
Route::get('/onLogin/{UserName}/{Password}','AdminLoginController@onLogin');
Route::get('/Logout','AdminLoginController@onLogout');






Route::get('/', function () {
    return view('index');
});


Route::get('{any}', function () {
    return view('index');
})->where('any', '.*');
