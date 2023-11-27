@component('mail::message')
# Daily Newsletter

The introduction to the notification.

@foreach($news as $article)
- {{ $article->title }}
@endforeach

@component('mail::button', ['url' => ''])
View All Articles
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent