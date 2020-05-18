<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::prefix('auth')->group(function () {
    Route::get('init', 'AppControllerAuth@init');
    Route::post('login', 'AppControllerAuth@login');
    Route::post('register', 'AppControllerAuth@register');
    Route::post('logout', 'AppControllerAuth@logout');
    // Route::get('init', 'AppControllerTodolist@init');
});

Route::prefix('list')->group(function () {
    Route::get('getList', 'AppControllerTodolist@todolist');
    Route::put('addToList', 'AppControllerTodolist@addToList');
    Route::post('updateList', 'AppControllerTodolist@updateList');
    Route::post('deleteItemFromList', 'AppControllerTodolist@deleteItemFromList');
});


