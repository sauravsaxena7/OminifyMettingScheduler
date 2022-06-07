<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schduler extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_name',
            'user_name',
            'description',
            'start_time',
            'end_time',
            'day_of_the_week',
            'day',
            'date',
            'year',
            'month',
            'email',

    ];
}
