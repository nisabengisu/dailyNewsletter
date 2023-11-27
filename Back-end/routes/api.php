<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsletterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('me', [AuthController::class, 'me'])->name('me');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'newsletter'
], function ($router) {
    Route::get('get', [NewsletterController::class, 'get'])->name('newsletter.get');
    Route::post('create', [NewsletterController::class, 'create'])->name('newsletter.create');
    Route::post('update', [NewsletterController::class, 'update'])->name('newsletter.update');
    Route::post('delete', [NewsletterController::class, 'delete'])->name('newsletter.delete');
});