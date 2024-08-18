import React, { memo } from 'react';
import { styled } from '../../style';
import TechSupportIqLogo from '../../assets/TechSupportIq_logo.svg';

const Link = styled.a(({ theme }) => ({
    alignItems: "flex-end",
    color: theme.greyWeakColor,
    display: "flex",
    fontSize: theme.unitSize * 1.375,
    justifyContent: "center",
    lineHeight: 1,
    marginTop: 'auto',
    padding: theme.unitSize * 2,
    paddingBottom: 0,
    textAlign: 'center',
    textDecoration: 'none',
	
	"&:focus":{		
		outline: "none",
		color: theme.primaryWeakColor,
		"#TechSupportIqBrandingLogo": {
			"& path, & polygon": {
				fill: theme.primaryWeakColor,
			}			
		}		
	}
}));

const Logo = styled(TechSupportIqLogo)(({ theme }) => ({
    fill: theme.greyWeakColor,
    height: 11,
    width: 80,
    marginLeft: 3,
    opacity: .9
}));

const URL = `https://www.TechSupportIq.com/?utm_campaign=TechSupportIqWebchatEmbedded&utm_medium=webchat&utm_term=webchat&utm_content=webchat&utm_source=${window.location.hostname}`;

const Branding = () => (
    <Link href={URL} target="_blank" aria-label="Powered by TechSupportIq. Opens in new tab" id="TechSupportIqBrandingLink">
        Powered by
        <Logo aria-hidden="true" id="TechSupportIqBrandingLogo" />
    </Link>
);

export default memo(Branding, () => true);
