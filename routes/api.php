<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// Example API test route
Route::get('/ping', function () {
    return response()->json(['message' => 'pong']);
});

// Example tasks API
Route::resource('tasks', TaskController::class);
