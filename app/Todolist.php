<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todolist extends Model
{
    protected $table = 'todolist';
    public function user()
    {
        return $this->belongsTo("App\User");
    }
}
