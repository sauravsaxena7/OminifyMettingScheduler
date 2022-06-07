<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    public function register(Request $request){

        if(User::where('email', $request->email)->first()){
            return response([
                'message'=>'Email already exist',
                'status'=>'failed',
            ],200);
        }

        $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|confirmed',

        ]);

        
        

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
        ]);

        $token = $user->createToken($request->email)->plainTextToken;

        return response([
            'user'=>$user,
            'token'=>$token,
            'status'=>'success',
            'message'=>'Registration Successfull!!'
        ],201);


    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response([
            'message' => 'Logout Success',
            'status'=>'success'
        ], 200);
    }

    public function login(Request $request){
        $request->validate([
           
            'email'=>'required|email',
            'password'=>'required',

        ]);

       

        $user = User::where('email', $request->email)->first();

        if($user && Hash::check($request->password,$user->password)){

            $token = $user->createToken($request->email)->plainTextToken;
            return response([
                'user'=>$user,
                'token'=>$token,
                'status'=>'success',
            ],200);
        }

        return response([
            'message'=>'Invalid creasdential',
            'status'=>'failed',
        ], 401);


    }


    public function logged_user(){
        $loggeduser = auth()->user();
        return response([
            'user'=>$loggeduser,
            'message' => 'Logged User Data',
            'status'=>'success'
        ], 200);
    }
}
