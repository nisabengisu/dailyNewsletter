<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsletterController extends Controller
{
    public function get(Request $request)
    {   
        return Newsletter::where('status', 1)->get();
    }

    public function create(Request $request)
    {
        $newsletter = new Newsletter();
        $newsletter->title = $request->title;
        $newsletter->description = $request->description;
        $newsletter->user_id = Auth::User()->id;
        $newsletter->status = 1;
        
        if ($newsletter->save()) {
            return ["status" => "success", "message" => "Haber Başarılı Şekilde Eklendi."];
        } else {
            return ["status" => "warn", "message" => "Haber Eklenirken Bir Hata Oluştu."];
        }
    }

    public function update(Request $request)
    {
        $newsletter = Newsletter::where("id", "=", $request->id)->first();
        $newsletter->title = $request->title;
        $newsletter->description = $request->description;
        $newsletter->user_id = Auth::User()->id;
        $newsletter->status = 1; //Aktif Haber Durumu
        
        if ($newsletter->save()) {
            return ["status" => "success", "message" => "Haber Başarılı Şekilde Güncellendi."];
        } else {
            return ["status" => "warn", "message" => "Haber Güncellenirken Bir Hata Oluştu."];
        }
    }

    public function delete(Request $request)
    {
        $newsletter = Newsletter::where("id", "=", $request->id)->first();
        
        if ($newsletter) {
            $newsletter->status = 2; //Pasif Haber Durumu

            if ($newsletter->save()) {
                return ["status" => "success", "message" => "Haber Başarılı Şekilde Silindi."];
            } else {
                return ["status" => "warn", "message" => "Haber Silinirken Bir Hata Oluştu."];
            }
        } else {
            return ["status" => "warn", "message" => "Haber Bulunamadı."];
        }
    }
}