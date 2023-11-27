<?php

// app/Console/Commands/Newsletter/Daily.php

namespace App\Console\Commands\Newsletter;

use Illuminate\Console\Command;

class Daily extends Command
{
    protected $signature = 'newsletter:daily';
    
    protected $description = 'Your command description here.';

    public function handle()
    {
        $this->info('Newsletter daily command executed successfully!');
    }
}