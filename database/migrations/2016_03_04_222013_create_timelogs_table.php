<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTimelogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timelogs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->datetime('startdate');
            $table->datetime('enddate');
            $table->bigInteger('minutes');

            $table->integer('client_id');
            $table->integer('project_id');
            $table->integer('task_id');
            $table->boolean('billable');
            $table->boolean('visible');

            $table->timestamps();
            $table->softDeletes();
        });
    }


/*

'user_id', 'startdate', 'enddate','minutes', 
                    'client_id', 'project_id', 'task_id', 'billable', 'visible'

                    */
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('timelogs');
    }
}
