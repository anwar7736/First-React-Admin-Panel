<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChartDataController;
use App\Http\Controllers\ClientReviewController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\FooterController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\HomeEtcController;
use App\Http\Controllers\ReviewController;

//Courses
Route::post('/onEditCourse', [CourseController::class, 'onEditCourse']);
//Project
Route::post('/onEditProject', [ProjectController::class, 'onEditProject']);
//Services
Route::post('/onEditService', [ServiceController::class, 'onEditService']);
//Review
Route::post('/onEditReview', [ReviewController::class, 'onEditReview']);

Route::get('/ChartData', [ChartDataController::class, 'onAllSelect']);
Route::get('/ClientReview', [ClientReviewController::class, 'onAllSelect']);
Route::post('/ContactSend', [ContactController::class, 'onContactSend']);
Route::get('/CourseHome', [CourseController::class, 'onSelectFour']);
Route::get('/CourseAll', [CourseController::class, 'onSelectAll']);

Route::get('/CourseDetails/{CourseID}', [CourseController::class, 'onSelectDetails']);

Route::get('/Footer', [FooterController::class, 'onSelect']);
Route::get('/Information', [InformationController::class, 'onSelect']);
Route::get('/Services', [ServiceController::class, 'onSelect']);
Route::get('/Project3', [ProjectController::class, 'onSelect3']);
Route::get('/ProjectAll', [ProjectController::class, 'onSelectAll']);
Route::get('/ProjectDetails/{projectID}', [ProjectController::class, 'onSelectDetail']);
Route::get('/VideoHome', [HomeEtcController::class, 'onSelectVideo']);
Route::get('/TotalProjectClient', [HomeEtcController::class, 'onSelectProjectClient']);
Route::get('/TechDesc', [HomeEtcController::class, 'onSelectTechDesc']);
Route::get('/HomeTopTitle', [HomeEtcController::class, 'onSelectHomeTitle']);


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
