<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Hospital; 


class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required|string',
            'role' => 'required|string',
            'hospitalId' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'role' => $fields['role'],
            'email' => $fields['email'],
            'hospitalId' => $fields['hospitalId'],
            'password' => bcrypt($fields['password'])
        ]);

        
        


        return response("successfull", 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad creds'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        return [
            'message' => 'Logged out'
        ];
    }
    public function user(Request $request) {
        $user = User::all();
        foreach ($user as $key => $use) {
            $hospital= $use['hospitalId'];
           
        }

        return response($user, 201);
    }
}
