<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Schduler;


class SchdulerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $loggeduser = auth()->user();
        
       


        $request->validate([
            'event_name'=>'required',
            'user_name'=>'required',
            'description'=>'required',
            'start_time'=>'required',
            'end_time'=>'required',
            'day_of_the_week'=>'required',
            'day'=>'required',
            'date'=>'required',
            'year'=>'required',
            'month'=>'required',
            'email'=>'required|email|unique:users',

        ]);
        //Schduler



        $schduler =Schduler::create([
            'event_name'=>$request->event_name,
            'user_name'=>$request->user_name,
            'description'=>$request->description,
            'start_time'=>$request->start_time,
            'end_time'=>$request->end_time,
            'day_of_the_week'=>$request->day_of_the_week,
            'day'=>$request->day,
            'date'=>$request->date,
            'year'=>$request->year,
            'month'=>$request->month,
            'email'=>$loggeduser->email,
        ]);

        if($schduler){
            return response([
                'scduler'=>$schduler,
                'status'=>'success',
                'message'=>'Operation Successfull!!'
            ],201);
 
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    // public function new_event(Request $request){

       
    // }

    public function fetch_event(){
        $loggeduser = auth()->user();

        $events = Schduler::all()->where('email', $loggeduser->email);
        return response([
            'events'=>$events,
            'message' => 'All events fetched successfully',
            'status'=>'success'
        ], 200);

    }

    public function fetch_single_event($id){
       
        $event = Schduler::where('id', $id)->first();

        return response([
            'events'=>$event,
            'message' => 'single events fetched successfully',
            'status'=>'success'
        ], 200);


    }
   

}
