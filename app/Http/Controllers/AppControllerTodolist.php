<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\User;
use App\Todolist;

class AppControllerTodolist extends Controller
{
    public function todolist() 
    {
        $user_id = Auth::user()->id;
        $x = Todolist::where('user_id', $user_id)->orderBy('id', 'asc')->get();

        return response()->json($x, 200);
    }
    public function addToList(Request $request)
    {
        $validate = $request->validate([
            'text' => 'required',
        ]);
        $list = new Todolist();
        $list->text = $validate['text'];
        $list->isDone = 0;
        $list->user_id = Auth::user()->id;
        if ($list->save()) {
            return response()->json($this->todolist()->original, 200);
        } else {
            return response()->json(['message', 'error'], 401);
        }
    }
    public function updateList(Request $request)
    {
        $validate = $request->validate([
            'id' => 'required',
            'isDone'=>'required',
        ]);
        $id = $validate['id'];
        $isDone = $validate['isDone'];
        $list = Todolist::find($id);
        $list->isDone = $isDone;
        if ($list->save()) {
            return response()->json($this->todolist()->original, 200);
        } else {
            return response()->json(['message', 'error'], 401);
        }
    }
    public function deleteItemFromList(Request $request)
    {
         $validate = $request->validate([
            'id' => 'required',
        ]);
        $id = $validate['id'];
        Todolist::find($id)->delete();
        return response()->json($this->todolist()->original, 200);
    }
}
