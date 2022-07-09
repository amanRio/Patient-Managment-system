<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hospital;

class hospitalController extends Controller
{
    public function hospital(Request $request) {
        $hospital = Hospital::all();
        return response($hospital, 201);
    }
    public function Storehospital(Request $request) {
     
        $fields = $request->validate([
            'name' => 'required|string',
            'lastName' => 'required|string',
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
 public function delete(Request $request , $id) {
    $val = Hospital::find($id);
    $val->delete();

   return response("successfuly Registered", 201);
}
}
