<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;

use App\Http\Controllers\SchdulerController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register',[UserController::class,'register']);

Route::post('/login',[UserController::class,'login']);


// Route::middleware(['auth:sanctum'])->group(function(){

//     Route::post('/logout',[UserController::class,'logout']);

// });

Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('/logout', [UserController::class, 'logout']);
    // Route::get('/loggeduser', [UserController::class, 'logged_user']);

    Route::post('/new_event', [SchdulerController::class, 'store']);

    Route::get('/fetch_event', [SchdulerController::class, 'fetch_event']);

    Route::get('/loggeduser', [UserController::class, 'logged_user']);

    Route::get('/event_scheduled/{id}',[SchdulerController::class,'fetch_single_event']);

   
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
