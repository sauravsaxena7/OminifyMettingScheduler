<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchdulersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schdulers', function (Blueprint $table) {
            $table->id();
            $table->string('event_name');
            $table->string('user_name');
            $table->string('email');
            $table->string('description');
            $table->string('start_time');
            $table->string('end_time');
            $table->string('day_of_the_week');
            $table->integer('date');
            $table->integer('month');
            $table->integer('year');
            $table->string('day');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schdulers');
    }
}
