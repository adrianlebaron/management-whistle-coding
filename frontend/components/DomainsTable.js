import { useEffect, useState } from "react";
import { getDrywallDomains, getFamilyDomains, getCommunityDomains, getOtherDomains } from "../lib/domains";
import Linkify from 'react-linkify';

export default function DomainsTable() {
    const [drywallDomains, setDrywallDomains] = useState([]);
    const [familyDomains, setFamilyDomains] = useState([]);
    const [communityDomains, setCommunityDomains] = useState([]);
    const [otherDomains, setOtherDomains] = useState([]);

    // Function to sort an array of domains alphabetically
    const sortDomainsAlphabetically = (domains) => {
        return domains.slice().sort((a, b) => a.domain_url.localeCompare(b.domain_url));
    };

    useEffect(() => {
        getDrywallDomains()
            .then((data) => setDrywallDomains(sortDomainsAlphabetically(data)))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        getFamilyDomains()
            .then((data) => setFamilyDomains(sortDomainsAlphabetically(data)))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        getCommunityDomains()
            .then((data) => setCommunityDomains(sortDomainsAlphabetically(data)))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        getOtherDomains()
            .then((data) => setOtherDomains(sortDomainsAlphabetically(data)))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            {/* DOMAINS TABLE */}
            <table>
                <thead>
                    <tr>
                        <th>Domains</th>
                        <th>Registrar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2">
                            <h4>Drywall</h4>
                        </td>
                    </tr>
                    {drywallDomains.map((domain) => (
                        <tr key={domain.domain_url}>
                            <td>
                                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                                    <a href={decoratedHref} target="_blank" rel="noopener noreferrer" key={key}>
                                        {decoratedText}
                                    </a>
                                )}>
                                    {domain.domain_url}
                                </Linkify>
                            </td>
                            <td>
                                <strong>{domain.registrar}</strong>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colspan="2">
                            <h4>Family</h4>
                        </td>
                    </tr>
                    {familyDomains.map((domain) => (
                        <tr key={domain.domain_url}>
                            <td>
                                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                                    <a href={decoratedHref} target="_blank" rel="noopener noreferrer" key={key}>
                                        {decoratedText}
                                    </a>
                                )}>
                                    {domain.domain_url}
                                </Linkify>
                            </td>
                            <td>
                                <strong>{domain.registrar}</strong>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colspan="2">
                            <h4>Community</h4>
                        </td>
                    </tr>
                    {communityDomains.map((domain) => (
                        <tr key={domain.domain_url}>
                            <td>
                                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                                    <a href={decoratedHref} target="_blank" rel="noopener noreferrer" key={key}>
                                        {decoratedText}
                                    </a>
                                )}>
                                    {domain.domain_url}
                                </Linkify>
                            </td>
                            <td>
                                <strong>{domain.registrar}</strong>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colspan="2">
                            <h4>Other</h4>
                        </td>
                    </tr>
                    {otherDomains.map((domain) => (
                        <tr key={domain.domain_url}>
                            <td>
                                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                                    <a href={decoratedHref} target="_blank" rel="noopener noreferrer" key={key}>
                                        {decoratedText}
                                    </a>
                                )}>
                                    {domain.domain_url}
                                </Linkify>
                            </td>
                            <td>
                                <strong>{domain.registrar}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}