<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hospital;
use Nette\Utils\Json;
use App\Models\User;

class apiController extends Controller
{
    public function hospital(Request $request) {
        $hospital = Hospital::all();
        return response($hospital, 201);
    }
    public function Storehospital(Request $request) {
     
        $fields = $request->validate([
            'name' => 'required|string',
            'adress' => 'required|string',
            'Phone' => 'required|string',
           
        ]);
        $user = Hospital::create([
            'name' => $fields['name'],
            'adress' => $fields['adress'],
            'Phone' => $fields['Phone'],
           
        ]);
        return response("successfuly Registered", 201);
    }
    public function update(Request $request , $id) {
     
    
     
     
      $val = Hospital::find($id);
      $val->update($request->all());

     return response("successfuly Registered", 201);
 }
 public function register(Request $request){
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
}
