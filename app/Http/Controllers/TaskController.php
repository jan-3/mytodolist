<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Task::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Task::insert([
            'description' => $request->description,
            'priority_level' => $request->priority_level,
            'category' => $request->category,
            'status' => $request->status,
            'due_date' => $request->due_date,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return Task::where('id', $id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        // if ($request->finishAll == true) {
        //     return Task::query()->update([
        //         'status' => 'Finished',
        //     ]);
        // }
        return Task::where('id', $id)->update([
            'description' => $request->description,
            'priority_level' => $request->priority_level,
            'category' => $request->category,
            'status' => $request->status,
            'due_date' => $request->due_date,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $task = Task::findOrFail($id);
        return $task->delete();
    }
}
