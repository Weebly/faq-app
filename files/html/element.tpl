<div class="accordion accordion--{{style}} no-touch">
    {{#items_each}} 
        <div class="accordion__item" data-item="{{items_index}}">
            <div class="accordion__title">
                <span>{title_{{items_index}}:text default="Question {{items_index}}"}<span>
            </div>
            <div class="accordion__content">
                <div style="padding: 10px 20px 20px;">
                    {text_{{items_index}}:text default="Answer to question {{items_index}}"}
                </div>
            </div>
        </div>
    {{/items_each}}
</div>