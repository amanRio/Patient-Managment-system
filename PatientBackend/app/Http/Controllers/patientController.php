<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class patientController extends Controller
{
    public function index(Request $request) {
        $patient = Patient::all();
        return response($patient, 201);
    }
    public function store(Request $request) {
        Patient::create($request->all());
        return response("successfuly Registered", 201);
    }
    public function update(Request $request , $id) {

      $val = Patient::find($id);
      $val->update($request->all());

     return response("successfuly updated", 201);
 }
 public function delete(Request $request , $id) {

    $val = Patient::find($id);
    $val->delete();

   return response("successfuly deleted", 201);
}
}
