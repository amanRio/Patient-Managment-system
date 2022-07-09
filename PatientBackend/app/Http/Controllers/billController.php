<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bill;

class billController extends Controller
{
    public function index(Request $request, $id) {
        $bill = Bill::Where('patientId',$id)->get();
        return response($bill, 201);
    }
    public function store(Request $request) {
        Bill::create($request->all());
        return response("successfuly Registered", 201);
    }
    public function search($id, $hospital) {
        $bill = Bill::Where('patientId',$id)->Where('hospitalId',$hospital)->get();
        return response($bill, 201);
    }
    public function status($id, Request $request) {
        $val = Bill::find($id);
        $val->insured=1;
        $val->save();
     return response("successfuly Registered", 201);
    }
}
