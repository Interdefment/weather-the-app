import { AutoComplete } from 'antd';
import React from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';

type PlacesAutocompleteProps = {
	onSelect: (value: string) => void;
	className?: string;
};

export const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
	onSelect,
	className,
}) => {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		debounce: 300,
	});

	const handleInput = (value: string) => {
		if (!ready) {
			return;
		}
		setValue(value);
	};

	const handleSelect = async (value: string) => {
		setValue('', false);
		clearSuggestions();
		onSelect(value);
	};

	const renderSuggestions = () =>
		data
			.filter(
				(suggestion) =>
					suggestion.types.includes('locality') ||
					suggestion.types.includes('postal_town')
			)
			.map((suggestion) => {
				const {
					place_id,
					structured_formatting: { main_text, secondary_text },
				} = suggestion;
				return (
					<AutoComplete.Option key={place_id} value={place_id}>
						<strong>{main_text}</strong> <small>{secondary_text}</small>
					</AutoComplete.Option>
				);
			});

	return (
		<AutoComplete
			value={value}
			onChange={handleInput}
			className={className}
			onSelect={handleSelect}
			notFoundContent="No results"
			placeholder="Find city..."
			autoFocus
		>
			{status === 'OK' && renderSuggestions()}
		</AutoComplete>
	);
};
