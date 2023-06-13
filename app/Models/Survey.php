<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;
    use HasSlug;

    public $fillable = ['user_id', 'image','title', 'description', 'expire_date', 'status', 'created_at', 'updated_at'];

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function questions() {
        return $this->hasMany(SurveyQuestion::class);
    }

    public function answers() {
        return $this->hasMany(SurveyAnswer::class);
    }
}
