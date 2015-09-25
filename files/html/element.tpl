<div class="accordion accordion--{{style}}">
    {{#items_each}} 
        <div class="accordion__item">
            <div class="accordion__title">
                <span>{title_{{items_index}}:text default="Question {{items_index}}"}<span>
            </div>
            <div class="accordion__content">
                {content_{{items_index}}:text default="Answer to question {{items_index}}"}
            </div>
        </div>
    {{/items_each}}
</div>