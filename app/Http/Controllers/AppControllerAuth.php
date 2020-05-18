<?php

namespace App\Http\Controllers;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class AppControllerAuth extends Controller
{
    public function init()
    {
        $user = Auth::user(); 
        return response()->json($user, 200);
    }
    public function register(Request $request)
    {
        $validate = $request->validate([
            'email' => 'required',
            'password' => 'required',
            'name'=>'required'
        ]);
        $user = User::Where('email', $request->email)->first();
        if (!$user) {
            $user = new User();
            $user->name = $validate['name'];
            $user->email = $validate['email'];
            $user->username = strstr($validate['email'], '@', true);
            $user->password = bcrypt($validate['password']);
            $user->save();
            Auth::login($user);
            return response()->json(['user' => $user], 200);
        } else {
            return response()->json(["message", "Podany uytkownik istnieje"], 401);
        }
    }
    public function login(Request $request)
    {
         $validate = $request->validate([
            'username' => 'required',
            'password' => 'required',
           
        ]);
        $username = $validate['username'];
        $password = $validate['password'];

        if (Auth::attempt(['email' => $username, 'password' => $password], true)) {
            return response()->json(['user' => Auth::user()], 200);
        } elseif (Auth::attempt(['username' => $username, 'password' => $password], true)) {
            return response()->json(['user' => Auth::user()], 200);
        } else {
            return response()->json(["message", "Błędny login lub hasło"], 401);
        }
    }
    public function logout()
    {
        Auth::logout();
    }
}
