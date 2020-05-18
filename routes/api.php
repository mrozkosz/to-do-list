<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:api')->group(function () {
    Route::get('init', 'AppControllerAuth@init');
    Route::get('getList', 'AppControllerTodolist@todolist');
    Route::put('addToList', 'AppControllerTodolist@addToList');
    Route::post('updateList', 'AppControllerTodolist@updateList');
    Route::post('deleteItemFromList', 'AppControllerTodolist@deleteItemFromList');
    
});
Route::post('register', 'AppControllerAuth@register');
