<div class="faqs {{theme}}">
	<ul class="faqs-ul">
	{{#items_each}}	
		<li class="faqs-li">
			<div class="faqs-item-title">
				{title_{{items_index}}:text default="Question {{items_index}}"}
			</div>
			<div class="faqs-item-content">
				{content_{{items_index}}:text default="Answer to question {{items_index}}"}
			</div>
		</li>
	{{/items_each}}
	</ul>
</div>