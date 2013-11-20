<?php
namespace tutons;
?>

<input type="file" name="file" id="file">
<table class="form-table">
	<tbody>
		<?php
			foreach($metaVO->getFields() as $metaBoxFieldVO)
			{
		?>
			<tr>
				<th>
					<label for="<?php echo $metaBoxFieldVO->getKey(); ?>[]">
						META FIELD TITLE
						<br/>
						<span class="description">META FIELD DESCRIPTION</span>
					</label>
				</th>
				<td>
					<input type="text" id="<?php echo $metaBoxFieldVO->getKey(); ?>[]" name="<?php echo $metaBoxFieldVO->getKey(); ?>[]" value="<?php echo $metaBoxFieldVO->getValue( $_GET['post'] ); ?>" class="regular-text" />
				</td>
			</tr>
		<?php
			}
		?>
	</tbody>
</table>