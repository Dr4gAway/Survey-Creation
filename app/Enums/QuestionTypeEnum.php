<?php

namespace App\Enums;

enum QuestionTypeEnum: string
{
    case Text = 'text';
    case TextArea = 'textarea';
    case Select = 'select';
    case Radio = 'radio';
    case Checkbox = 'checkbox';
}