<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
class TodolistTest extends TestCase
{
    /** @test */
    public function add_items_to_list()
    {
        $this->withExceptionHandling();
        $response = $this->put('auth/addToList',['text','zakupy']);
        $response->assertOk();
        $response->assertStatus(200);
    }
}
