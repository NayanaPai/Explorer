import React from 'react';
import { INTERESTS } from '../data/interests';
import InterestCard from './InterestCard';

const DiscoveryGrid = ({ selectedIds, toggleInterest }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem',
            padding: '1rem 0'
        }}>
            {INTERESTS.map(interest => (
                <InterestCard
                    key={interest.id}
                    interest={interest}
                    isSelected={selectedIds.includes(interest.id)}
                    onClick={() => toggleInterest(interest.id)}
                />
            ))}
        </div>
    );
};

export default DiscoveryGrid;
