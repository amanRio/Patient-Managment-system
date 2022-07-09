<?php

use App\Http\Controllers\apiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\billController;
use App\Http\Controllers\hospitalController;
use App\Http\Controllers\patientController;

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



// Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/hospital', [hospitalController::class, 'hospital']);
Route::get('/hospitaldelete/{id}', [hospitalController::class, 'delete']);
Route::Post('/shospital', [apiController::class, 'Storehospital']);
Route::Post('/updatehospital/{id}', [hospitalController::class, 'update']);

Route::Post('/registeruser', [AuthController::class, 'register']);
Route::get('/user', [AuthController::class, 'user']);


Route::Post('/registerbill', [billController::class, 'store']);
Route::get('/bill/{id}', [billController::class, 'index']);
Route::get('/billsearch/{hospital}/{id}', [billController::class, 'search']);
Route::get('/billstatus/{id}', [billController::class, 'status']);

Route::Post('/registerpatient', [patientController::class, 'store']);
Route::Post('/updatepatient/{id}', [patientController::class, 'update']);
Route::get('/patient', [patientController::class, 'index']);



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {c
//     return $request->user();
// });