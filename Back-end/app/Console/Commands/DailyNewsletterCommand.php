<?php

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\DailyNewsletter;
use App\Models\Newsletter;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DailyNewsletterCommand extends Command
{
    protected $signature = 'daily:newsletter';
    protected $description = 'Send daily newsletters to users';

    public function handle()
    {

        $date = Carbon::now(); 
        $news = DB::table('newsletters')
            ->whereDate('created_at', $date)
            ->where('status', 1)
            ->get();

        $users = User::all();

        foreach ($users as $user) {
            Mail::to($user->email)->send(new DailyNewsletter($news));
        }

        $this->info('Daily newsletters sent successfully!');
    }
}